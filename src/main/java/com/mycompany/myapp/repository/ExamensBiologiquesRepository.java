package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.ExamensBiologiques;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the ExamensBiologiques entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExamensBiologiquesRepository extends JpaRepository<ExamensBiologiques, Long> {

    @Query("select examensBiologiques from ExamensBiologiques examensBiologiques where examensBiologiques.user.login = ?#{principal.username}")
    List<ExamensBiologiques> findByUserIsCurrentUser();
}
