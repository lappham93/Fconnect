package com.mit.entities;

import java.io.Serializable;
import java.util.Date;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.annotation.Transient;
import org.springframework.data.domain.Persistable;

public abstract class ActiveTimeDoc<T extends Serializable> implements Persistable<T> {
	private static final long serialVersionUID = -4679114818348534726L;
	private boolean isDeleted;
	private boolean isActive;
	@CreatedDate
	private Date createdDate;
	@LastModifiedDate
	private Date updatedDate;
	@Transient
	private boolean isNewed;
	
	public abstract void setId(T id);
	
	@Override
	public boolean isNew() {
		return isNewed;
	}

	public boolean isDeleted() {
		return isDeleted;
	}

	public void setDeleted(boolean isDeleted) {
		this.isDeleted = isDeleted;
	}

	public boolean isActive() {
		return isActive;
	}

	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public Date getUpdatedDate() {
		return updatedDate;
	}

	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}

	public boolean isNewed() {
		return isNewed;
	}

	public void setNewed(boolean isNewed) {
		this.isNewed = isNewed;
	}
	
	

}
