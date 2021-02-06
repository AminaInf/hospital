package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class VaccinationsTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Vaccinations.class);
        Vaccinations vaccinations1 = new Vaccinations();
        vaccinations1.setId(1L);
        Vaccinations vaccinations2 = new Vaccinations();
        vaccinations2.setId(vaccinations1.getId());
        assertThat(vaccinations1).isEqualTo(vaccinations2);
        vaccinations2.setId(2L);
        assertThat(vaccinations1).isNotEqualTo(vaccinations2);
        vaccinations1.setId(null);
        assertThat(vaccinations1).isNotEqualTo(vaccinations2);
    }
}
