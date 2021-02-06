package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Vaccinations;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Vaccinations entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VaccinationsRepository extends JpaRepository<Vaccinations, Long> {

    @Query("select vaccinations from Vaccinations vaccinations where vaccinations.user.login = ?#{principal.username}")
    List<Vaccinations> findByUserIsCurrentUser();
}
