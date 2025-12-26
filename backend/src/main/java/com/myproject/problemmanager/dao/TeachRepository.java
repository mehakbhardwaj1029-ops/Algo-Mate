package com.myproject.problemmanager.dao;

import com.myproject.problemmanager.entity.ProblemTeaching;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface TeachRepository extends JpaRepository<ProblemTeaching,Long> {

      List<ProblemTeaching> findByUserId(Long id);

      ProblemTeaching findByProblemName(String problemName);

      List<ProblemTeaching> findAllByProblemName(String problemName);

      Optional<ProblemTeaching> findByProblemId(String id);

      void deleteByProblemId(String id);

    List<ProblemTeaching> findAllByProblemNameAndUserId(String problemName, Long userId);

}
