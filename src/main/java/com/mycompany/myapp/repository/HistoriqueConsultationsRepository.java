package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.HistoriqueConsultations;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the HistoriqueConsultations entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HistoriqueConsultationsRepository extends JpaRepository<HistoriqueConsultations, Long> {

    @Query("select historiqueConsultations from HistoriqueConsultations historiqueConsultations where historiqueConsultations.user.login = ?#{principal.username}")
    List<HistoriqueConsultations> findByUserIsCurrentUser();
}
