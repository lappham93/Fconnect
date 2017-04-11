package com.mit.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "user")
public class User extends ActiveTimeDoc<Long> {
	private static final long serialVersionUID = -8223193465868147011L;
	@Id
	private long id;
	@Indexed(unique = true)
	private String email;
	private String password;
	private String salt;

	@Override
	public Long getId() {
		return id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getSalt() {
		return salt;
	}

	public void setSalt(String salt) {
		this.salt = salt;
	}

	public void setId(Long id) {
		this.id = id;
	}

}
