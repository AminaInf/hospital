package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Antecedents;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Antecedents entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AntecedentsRepository extends JpaRepository<Antecedents, Long> {

    @Query("select antecedents from Antecedents antecedents where antecedents.user.login = ?#{principal.username}")
    List<Antecedents> findByUserIsCurrentUser();
}
