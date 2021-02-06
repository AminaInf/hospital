package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Ordonnances;
import com.mycompany.myapp.repository.OrdonnancesRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Ordonnances}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class OrdonnancesResource {

    private final Logger log = LoggerFactory.getLogger(OrdonnancesResource.class);

    private static final String ENTITY_NAME = "ordonnances";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final OrdonnancesRepository ordonnancesRepository;

    public OrdonnancesResource(OrdonnancesRepository ordonnancesRepository) {
        this.ordonnancesRepository = ordonnancesRepository;
    }

    /**
     * {@code POST  /ordonnances} : Create a new ordonnances.
     *
     * @param ordonnances the ordonnances to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ordonnances, or with status {@code 400 (Bad Request)} if the ordonnances has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ordonnances")
    public ResponseEntity<Ordonnances> createOrdonnances(@RequestBody Ordonnances ordonnances) throws URISyntaxException {
        log.debug("REST request to save Ordonnances : {}", ordonnances);
        if (ordonnances.getId() != null) {
            throw new BadRequestAlertException("A new ordonnances cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Ordonnances result = ordonnancesRepository.save(ordonnances);
        return ResponseEntity.created(new URI("/api/ordonnances/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ordonnances} : Updates an existing ordonnances.
     *
     * @param ordonnances the ordonnances to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ordonnances,
     * or with status {@code 400 (Bad Request)} if the ordonnances is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ordonnances couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ordonnances")
    public ResponseEntity<Ordonnances> updateOrdonnances(@RequestBody Ordonnances ordonnances) throws URISyntaxException {
        log.debug("REST request to update Ordonnances : {}", ordonnances);
        if (ordonnances.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Ordonnances result = ordonnancesRepository.save(ordonnances);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ordonnances.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /ordonnances} : get all the ordonnances.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ordonnances in body.
     */
    @GetMapping("/ordonnances")
    public ResponseEntity<List<Ordonnances>> getAllOrdonnances(Pageable pageable) {
        log.debug("REST request to get a page of Ordonnances");
        Page<Ordonnances> page = ordonnancesRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /ordonnances/:id} : get the "id" ordonnances.
     *
     * @param id the id of the ordonnances to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ordonnances, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ordonnances/{id}")
    public ResponseEntity<Ordonnances> getOrdonnances(@PathVariable Long id) {
        log.debug("REST request to get Ordonnances : {}", id);
        Optional<Ordonnances> ordonnances = ordonnancesRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ordonnances);
    }

    /**
     * {@code DELETE  /ordonnances/:id} : delete the "id" ordonnances.
     *
     * @param id the id of the ordonnances to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ordonnances/{id}")
    public ResponseEntity<Void> deleteOrdonnances(@PathVariable Long id) {
        log.debug("REST request to delete Ordonnances : {}", id);
        ordonnancesRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
