package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.HistoriqueConsultations;
import com.mycompany.myapp.repository.HistoriqueConsultationsRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.HistoriqueConsultations}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class HistoriqueConsultationsResource {

    private final Logger log = LoggerFactory.getLogger(HistoriqueConsultationsResource.class);

    private static final String ENTITY_NAME = "historiqueConsultations";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final HistoriqueConsultationsRepository historiqueConsultationsRepository;

    public HistoriqueConsultationsResource(HistoriqueConsultationsRepository historiqueConsultationsRepository) {
        this.historiqueConsultationsRepository = historiqueConsultationsRepository;
    }

    /**
     * {@code POST  /historique-consultations} : Create a new historiqueConsultations.
     *
     * @param historiqueConsultations the historiqueConsultations to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new historiqueConsultations, or with status {@code 400 (Bad Request)} if the historiqueConsultations has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/historique-consultations")
    public ResponseEntity<HistoriqueConsultations> createHistoriqueConsultations(@RequestBody HistoriqueConsultations historiqueConsultations) throws URISyntaxException {
        log.debug("REST request to save HistoriqueConsultations : {}", historiqueConsultations);
        if (historiqueConsultations.getId() != null) {
            throw new BadRequestAlertException("A new historiqueConsultations cannot already have an ID", ENTITY_NAME, "idexists");
        }
        HistoriqueConsultations result = historiqueConsultationsRepository.save(historiqueConsultations);
        return ResponseEntity.created(new URI("/api/historique-consultations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /historique-consultations} : Updates an existing historiqueConsultations.
     *
     * @param historiqueConsultations the historiqueConsultations to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated historiqueConsultations,
     * or with status {@code 400 (Bad Request)} if the historiqueConsultations is not valid,
     * or with status {@code 500 (Internal Server Error)} if the historiqueConsultations couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/historique-consultations")
    public ResponseEntity<HistoriqueConsultations> updateHistoriqueConsultations(@RequestBody HistoriqueConsultations historiqueConsultations) throws URISyntaxException {
        log.debug("REST request to update HistoriqueConsultations : {}", historiqueConsultations);
        if (historiqueConsultations.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        HistoriqueConsultations result = historiqueConsultationsRepository.save(historiqueConsultations);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, historiqueConsultations.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /historique-consultations} : get all the historiqueConsultations.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of historiqueConsultations in body.
     */
    @GetMapping("/historique-consultations")
    public ResponseEntity<List<HistoriqueConsultations>> getAllHistoriqueConsultations(Pageable pageable) {
        log.debug("REST request to get a page of HistoriqueConsultations");
        Page<HistoriqueConsultations> page = historiqueConsultationsRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /historique-consultations/:id} : get the "id" historiqueConsultations.
     *
     * @param id the id of the historiqueConsultations to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the historiqueConsultations, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/historique-consultations/{id}")
    public ResponseEntity<HistoriqueConsultations> getHistoriqueConsultations(@PathVariable Long id) {
        log.debug("REST request to get HistoriqueConsultations : {}", id);
        Optional<HistoriqueConsultations> historiqueConsultations = historiqueConsultationsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(historiqueConsultations);
    }

    /**
     * {@code DELETE  /historique-consultations/:id} : delete the "id" historiqueConsultations.
     *
     * @param id the id of the historiqueConsultations to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/historique-consultations/{id}")
    public ResponseEntity<Void> deleteHistoriqueConsultations(@PathVariable Long id) {
        log.debug("REST request to delete HistoriqueConsultations : {}", id);
        historiqueConsultationsRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
