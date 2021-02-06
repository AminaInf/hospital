package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class ExamensBiologiquesTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ExamensBiologiques.class);
        ExamensBiologiques examensBiologiques1 = new ExamensBiologiques();
        examensBiologiques1.setId(1L);
        ExamensBiologiques examensBiologiques2 = new ExamensBiologiques();
        examensBiologiques2.setId(examensBiologiques1.getId());
        assertThat(examensBiologiques1).isEqualTo(examensBiologiques2);
        examensBiologiques2.setId(2L);
        assertThat(examensBiologiques1).isNotEqualTo(examensBiologiques2);
        examensBiologiques1.setId(null);
        assertThat(examensBiologiques1).isNotEqualTo(examensBiologiques2);
    }
}
