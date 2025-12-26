package com.myproject.problemmanager.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtUtil {

       @Value("${jwt.secret.key}")
       private String secretKey;

       public String generateToken(UserDetails userDetails){
           Map<String ,Object> claims = new HashMap<>();
           return createToken(claims,userDetails.getUsername());
       }

    private String createToken(Map<String, Object> claims, String subject) {
           return Jwts.builder()
                   .setClaims(claims)
                   .setSubject(subject)
                   .setIssuedAt(new Date(System.currentTimeMillis()))
                   .setExpiration(new Date(System.currentTimeMillis()+1000*60*60*10))
                   .signWith(SignatureAlgorithm.HS256,secretKey)
                   .compact();

    }

    public String extractUsername(String token){
          return extractClaim(token, Claims::getSubject);
    }
public Date extractExpiration(String token){
           return extractClaim(token,Claims::getExpiration);
}

    private <T> T extractClaim(String token, Function<Claims,T> claimsResolver) {
           final Claims claims = extractAllClaims(token);
           return claimsResolver.apply(claims);

    }

    private Claims extractAllClaims(String token) {

        return Jwts.parser()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Boolean isTokenExpired(String token){
           return extractExpiration(token).before(new Date());
    }
    public Boolean validateToken(String token, UserDetails userDetails){
           final String username = extractUsername(token);
           return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

}

//Jwts.builder()
//
//Meaning: Starts building a new JWT (JSON Web Token).
//
//Behind the scenes: You’re using the JJWT library (io.jsonwebtoken) which provides this fluent API for building tokens.
//
//2. .setClaims(claims)
//
//Meaning: Adds custom data (extra info) into the JWT payload.
//
//Example: You can store things like roles, user ID, email, etc.
//
//Behind the scenes: These claims are stored in the payload part of the JWT (the middle section of the 3-part token: header.payload.signature).
//
//3. .setSubject(subject)
//
//Meaning: Sets the "subject" of the token.
//
//Usually: This is the username of the authenticated user.
//
//Behind the scenes: Subject is a standard JWT claim (sub) that identifies the principal (the user or entity the token belongs to).
//
//4. .setIssuedAt(new Date(System.currentTimeMillis()))
//
//Meaning: Sets the timestamp when the token was created.
//
//Standard Claim: (iat) → "Issued At".
//
//Why: Useful for debugging, token invalidation, and checking when the token started being valid.
//
//5. .setExpiration(new Date(System.currentTimeMillis() + 1000*60*60*10))
//
//Meaning: Defines when the token will expire.
//
//Here: 1000*60*60*10 = 10 hours.
//
//Standard Claim: (exp) → "Expiration time".
//
//Behind the scenes: Once expired, if a request uses this token, Spring Security (or your custom filter) will reject it.
//
//6. .signWith(SignatureAlgorithm.HS256, secretKey)
//
//Meaning: Digitally signs the token using HMAC-SHA256 algorithm and your secretKey.
//
//Why: This ensures the token cannot be tampered with. If someone changes the payload, the signature will not match.
//
//Behind the scenes:
//
//The header ({"alg":"HS256","typ":"JWT"})
//
//The payload (claims + subject + issuedAt + expiration)
//
//These are Base64 encoded and then hashed with the secret key.
//
//Signature = HMACSHA256(header + "." + payload, secretKey)
//
//7. .compact()
//
//Meaning: Builds the final JWT string.
//
//Output: A JWT like:
//
//eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2huZG9lIiwiaWF0IjoxNzMwNzAxNzcyLCJleHAiOjE3MzA3MzA5NzJ9.lNQe

////You’re asking: “If I already have final Claims claims = extractAllClaims(token);, why not just return claims; instead of applying claimsResolver.apply(claims)?”
//
//Let’s look at the difference.
//If you just return claims:
//public Claims extractClaim(String token) {
//    final Claims claims = extractAllClaims(token);
//    return claims;
//}
//
//
//Usage:
//
//Claims claims = extractClaim(token);
//String username = claims.getSubject();
//Date expiration = claims.getExpiration();
//
//
//Here, your extractClaim method doesn’t really do anything beyond extractAllClaims.
//
//It gives you the whole Claims object and pushes the responsibility of choosing what you want back to the caller.
//
//The method name extractClaim becomes misleading, because it doesn’t extract a claim, it extracts all claims.
//
//If you apply claimsResolver:
//public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
//    final Claims claims = extractAllClaims(token);
//    return claimsResolver.apply(claims);
//}
//
//
//Usage:
//
//String username = extractClaim(token, Claims::getSubject);
//Date expiration = extractClaim(token, Claims::getExpiration);
//
//
//Now the method truly extracts one specific claim from the JWT.
//
//The caller doesn’t deal with Claims directly; they only get what they ask for.
//
//The name extractClaim actually makes sense.
//
//🔑 Key difference
//
//Returning claims = you’re just exposing the whole bag of claims, same as extractAllClaims.
//
//Returning claimsResolver.apply(claims) = you’re giving the caller exactly what they want (subject, expiration, etc.) while hiding the rest.
//
//Think of it like this:
//
//return claims; → “Here’s the whole book, find the page you want.”
//
//return claimsResolver.apply(claims); → “Tell me the page number, I’ll hand you that exact page.”
//
//✅ Conclusion:
//If you just return claims, your extractClaim method is redundant (it does the same as extractAllClaims).
//Using claimsResolver.apply(claims) makes it a true generic extractor, which is why the pattern is used.

///////
//Nice — this is the heart of JWT validation 👍
//Let’s carefully unpack what your method is doing:
//
//private Claims extractAllClaims(String token) {
//    return Jwts.parser()
//               .setSigningKey(secretKey)
//               .build()
//               .parseClaimsJws(token)
//               .getBody();
//}
//
//Step by Step:
//1. Jwts.parser()
//
//Creates a new JWT parser builder from the JJWT library (io.jsonwebtoken).
//
//Think of it as: “I want to parse a token, let me set up the rules first.”
//
//2. .setSigningKey(secretKey)
//
//Provides the secret key you used when generating the JWT.
//
//The parser will use this to verify the token’s signature.
//
//If the token was modified or forged, verification will fail here.
//
//3. .build()
//
//Builds the actual parser instance with the settings you’ve provided (in this case, the signing key).
//
//In JJWT 0.11.0+, you must call .build() after configuring. (In older versions, .parser() returned a parser directly.)
//
//4. .parseClaimsJws(token)
//
//Parses the JWT string you pass in.
//
//It does 2 critical things:
//
//Decodes the JWT (splits into Header, Payload, Signature).
//
//Validates the signature using your secretKey.
//
//If the signature is invalid (tampered token), it throws an exception (io.jsonwebtoken.security.SignatureException).
//
//If valid, it proceeds.
//
//The result is a Jws<Claims> object, which contains:
//
//getHeader() → JWT header
//
//getBody() → JWT claims (payload)
//
//getSignature() → The token’s signature
//
//5. .getBody()
//
//Extracts the claims (the payload) from the parsed JWT.
//
//This is where your custom info (username, roles, etc.) and standard claims (sub, iat, exp) live.
//
//So the returned object is a Claims instance, which is basically a Map<String, Object> with extra helper methods.
//
//✅ In Plain English
//
//This method takes a JWT string, verifies that it hasn’t been tampered with (using your secret key), and then returns the payload (claims) inside it.
//
//Example of claims you might get:
//
//{
//  "sub": "john_doe",
//  "role": "ADMIN",
//  "iat": 1735692345,
//  "exp": 1735728345
//}
//
//
//👉 So extractAllClaims = “parse and validate the token, then hand me all the claims (payload).”