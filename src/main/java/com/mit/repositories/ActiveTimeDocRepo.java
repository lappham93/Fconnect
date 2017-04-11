package com.mit.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import com.mit.entities.ActiveTimeDoc;
import com.mit.exceptions.SequenceException;

@Repository
public class ActiveTimeDocRepo<T extends ActiveTimeDoc<Long>>{
	@Autowired
	protected MongoOperations mongoOps;

	@Autowired
	protected SeqIdRepo seqIdRepo;
	
	private Class<T> classType;
	
	public ActiveTimeDocRepo(Class<T> classType) {
		this.classType = classType;
	}
	
	public void insert(T user) {
		user.setNewed(true);
		mongoOps.insert(user);
	}

	public void save(T user) throws SequenceException {
		long id = (long) user.getId();
		if (id <= 0) {
			user.setNewed(true);
			user.setId(seqIdRepo.getNextSequenceId(mongoOps.getCollectionName(user.getClass())));
		}

		mongoOps.save(user);
	}
	
	public T findById(long id) {
		return mongoOps.findById(id, classType);
	}
	
	public void delete(long id) {
		Query query = new Query(Criteria.where("id").is(id));
		Update update = new Update();
		update.set("isActive", false);
		update.set("isDeleted", true);
		mongoOps.findAndModify(query, update, classType);
	}
	
}
