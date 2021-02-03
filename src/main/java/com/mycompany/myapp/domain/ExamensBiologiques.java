package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A ExamensBiologiques.
 */
@Entity
@Table(name = "examens_biologiques")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ExamensBiologiques implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date")
    private Instant date;

    @Column(name = "texte")
    private String texte;

    @ManyToOne
    @JsonIgnoreProperties(value = "examensBiologiques", allowSetters = true)
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

    public ExamensBiologiques date(Instant date) {
        this.date = date;
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public String getTexte() {
        return texte;
    }

    public ExamensBiologiques texte(String texte) {
        this.texte = texte;
        return this;
    }

    public void setTexte(String texte) {
        this.texte = texte;
    }

    public User getUser() {
        return user;
    }

    public ExamensBiologiques user(User user) {
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
        if (!(o instanceof ExamensBiologiques)) {
            return false;
        }
        return id != null && id.equals(((ExamensBiologiques) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ExamensBiologiques{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", texte='" + getTexte() + "'" +
            "}";
    }
}
