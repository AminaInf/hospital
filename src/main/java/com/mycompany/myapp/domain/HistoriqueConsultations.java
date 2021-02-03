package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A HistoriqueConsultations.
 */
@Entity
@Table(name = "historique_consultations")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class HistoriqueConsultations implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date")
    private Instant date;

    @Column(name = "acte")
    private String acte;

    @Column(name = "motif")
    private String motif;

    @Column(name = "taille")
    private Double taille;

    @Column(name = "poids")
    private Double poids;

    @Column(name = "ta")
    private Double ta;

    @Column(name = "pouls")
    private Integer pouls;

    @Column(name = "observation")
    private String observation;

    @Column(name = "at")
    private String at;

    @ManyToOne
    @JsonIgnoreProperties(value = "historiqueConsultations", allowSetters = true)
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDate() {
        return date;
    }

    public HistoriqueConsultations date(Instant date) {
        this.date = date;
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public String getActe() {
        return acte;
    }

    public HistoriqueConsultations acte(String acte) {
        this.acte = acte;
        return this;
    }

    public void setActe(String acte) {
        this.acte = acte;
    }

    public String getMotif() {
        return motif;
    }

    public HistoriqueConsultations motif(String motif) {
        this.motif = motif;
        return this;
    }

    public void setMotif(String motif) {
        this.motif = motif;
    }

    public Double getTaille() {
        return taille;
    }

    public HistoriqueConsultations taille(Double taille) {
        this.taille = taille;
        return this;
    }

    public void setTaille(Double taille) {
        this.taille = taille;
    }

    public Double getPoids() {
        return poids;
    }

    public HistoriqueConsultations poids(Double poids) {
        this.poids = poids;
        return this;
    }

    public void setPoids(Double poids) {
        this.poids = poids;
    }

    public Double getTa() {
        return ta;
    }

    public HistoriqueConsultations ta(Double ta) {
        this.ta = ta;
        return this;
    }

    public void setTa(Double ta) {
        this.ta = ta;
    }

    public Integer getPouls() {
        return pouls;
    }

    public HistoriqueConsultations pouls(Integer pouls) {
        this.pouls = pouls;
        return this;
    }

    public void setPouls(Integer pouls) {
        this.pouls = pouls;
    }

    public String getObservation() {
        return observation;
    }

    public HistoriqueConsultations observation(String observation) {
        this.observation = observation;
        return this;
    }

    public void setObservation(String observation) {
        this.observation = observation;
    }

    public String getAt() {
        return at;
    }

    public HistoriqueConsultations at(String at) {
        this.at = at;
        return this;
    }

    public void setAt(String at) {
        this.at = at;
    }

    public User getUser() {
        return user;
    }

    public HistoriqueConsultations user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof HistoriqueConsultations)) {
            return false;
        }
        return id != null && id.equals(((HistoriqueConsultations) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "HistoriqueConsultations{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", acte='" + getActe() + "'" +
            ", motif='" + getMotif() + "'" +
            ", taille=" + getTaille() +
            ", poids=" + getPoids() +
            ", ta=" + getTa() +
            ", pouls=" + getPouls() +
            ", observation='" + getObservation() + "'" +
            ", at='" + getAt() + "'" +
            "}";
    }
}
