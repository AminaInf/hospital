package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Planification;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Planification entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PlanificationRepository extends JpaRepository<Planification, Long> {

    @Query("select planification from Planification planification where planification.user.login = ?#{principal.username}")
    List<Planification> findByUserIsCurrentUser();
}
