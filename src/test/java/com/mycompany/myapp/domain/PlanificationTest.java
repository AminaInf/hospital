package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class PlanificationTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Planification.class);
        Planification planification1 = new Planification();
        planification1.setId(1L);
        Planification planification2 = new Planification();
        planification2.setId(planification1.getId());
        assertThat(planification1).isEqualTo(planification2);
        planification2.setId(2L);
        assertThat(planification1).isNotEqualTo(planification2);
        planification1.setId(null);
        assertThat(planification1).isNotEqualTo(planification2);
    }
}
