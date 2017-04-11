package com.mit.app;

import static org.assertj.core.api.Assertions.assertThat;

import org.apache.commons.lang3.RandomStringUtils;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.mit.entities.Admin;
import com.mit.repositories.AdminRepo;
import com.mit.utils.AuthenticateUtils;

/**
 * Created by Hung Le on 2/16/17.
 */

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ImportAdminAccount {
	@Autowired
	private AdminRepo adminRepo;

	boolean isRunned = false;

	@Before
	public void importAdminAccount() {
		if (!isRunned) {
			try {
				Admin admin = new Admin();
				admin.setUserName("homberAdmin");
				String salt = RandomStringUtils.random(10);
				String password = "h0mb3r$Admin";
				admin.setSalt(salt);
				admin.setPassword(AuthenticateUtils.hashPassword(password, salt));
				admin.setActive(true);
				adminRepo.save(admin);
			} catch (Exception e) {
				System.out.println(e);
			}
			isRunned = true;
		}
	}
	
	 @Test
	public void testAdminAccount() {
		Admin admin = adminRepo.findById(1);
		assertThat(admin).isNotNull();
		assertThat(admin.getUserName()).isEqualTo("homberAdmin");
	}
}
