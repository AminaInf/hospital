package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Ordonnances;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Ordonnances entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrdonnancesRepository extends JpaRepository<Ordonnances, Long> {

    @Query("select ordonnances from Ordonnances ordonnances where ordonnances.user.login = ?#{principal.username}")
    List<Ordonnances> findByUserIsCurrentUser();
}
