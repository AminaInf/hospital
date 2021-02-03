package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class HistoriqueConsultationsTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(HistoriqueConsultations.class);
        HistoriqueConsultations historiqueConsultations1 = new HistoriqueConsultations();
        historiqueConsultations1.setId(1L);
        HistoriqueConsultations historiqueConsultations2 = new HistoriqueConsultations();
        historiqueConsultations2.setId(historiqueConsultations1.getId());
        assertThat(historiqueConsultations1).isEqualTo(historiqueConsultations2);
        historiqueConsultations2.setId(2L);
        assertThat(historiqueConsultations1).isNotEqualTo(historiqueConsultations2);
        historiqueConsultations1.setId(null);
        assertThat(historiqueConsultations1).isNotEqualTo(historiqueConsultations2);
    }
}
