package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class AntecedentsTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Antecedents.class);
        Antecedents antecedents1 = new Antecedents();
        antecedents1.setId(1L);
        Antecedents antecedents2 = new Antecedents();
        antecedents2.setId(antecedents1.getId());
        assertThat(antecedents1).isEqualTo(antecedents2);
        antecedents2.setId(2L);
        assertThat(antecedents1).isNotEqualTo(antecedents2);
        antecedents1.setId(null);
        assertThat(antecedents1).isNotEqualTo(antecedents2);
    }
}
