package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A Vaccinations.
 */
@Entity
@Table(name = "vaccinations")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Vaccinations implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date")
    private Instant date;

    @Column(name = "vaccin")
    private String vaccin;

    @Column(name = "injection")
    private String injection;

    @Column(name = "methode")
    private String methode;

    @Column(name = "lot")
    private String lot;

    @Column(name = "resultat")
    private String resultat;

    @Column(name = "rappel")
    private Instant rappel;

    @ManyToOne
    @JsonIgnoreProperties(value = "vaccinations", allowSetters = true)
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

    public Vaccinations date(Instant date) {
        this.date = date;
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public String getVaccin() {
        return vaccin;
    }

    public Vaccinations vaccin(String vaccin) {
        this.vaccin = vaccin;
        return this;
    }

    public void setVaccin(String vaccin) {
        this.vaccin = vaccin;
    }

    public String getInjection() {
        return injection;
    }

    public Vaccinations injection(String injection) {
        this.injection = injection;
        return this;
    }

    public void setInjection(String injection) {
        this.injection = injection;
    }

    public String getMethode() {
        return methode;
    }

    public Vaccinations methode(String methode) {
        this.methode = methode;
        return this;
    }

    public void setMethode(String methode) {
        this.methode = methode;
    }

    public String getLot() {
        return lot;
    }

    public Vaccinations lot(String lot) {
        this.lot = lot;
        return this;
    }

    public void setLot(String lot) {
        this.lot = lot;
    }

    public String getResultat() {
        return resultat;
    }

    public Vaccinations resultat(String resultat) {
        this.resultat = resultat;
        return this;
    }

    public void setResultat(String resultat) {
        this.resultat = resultat;
    }

    public Instant getRappel() {
        return rappel;
    }

    public Vaccinations rappel(Instant rappel) {
        this.rappel = rappel;
        return this;
    }

    public void setRappel(Instant rappel) {
        this.rappel = rappel;
    }

    public User getUser() {
        return user;
    }

    public Vaccinations user(User user) {
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
        if (!(o instanceof Vaccinations)) {
            return false;
        }
        return id != null && id.equals(((Vaccinations) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Vaccinations{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", vaccin='" + getVaccin() + "'" +
            ", injection='" + getInjection() + "'" +
            ", methode='" + getMethode() + "'" +
            ", lot='" + getLot() + "'" +
            ", resultat='" + getResultat() + "'" +
            ", rappel='" + getRappel() + "'" +
            "}";
    }
}
