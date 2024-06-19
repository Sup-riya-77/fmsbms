package com.project.fmsbms.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.fmsbms.entities.FamilyMember;
import com.project.fmsbms.entities.MobileService;
import com.project.fmsbms.exceptions.FamilyNotFoundException;
import com.project.fmsbms.exceptions.MobileServiceNotFoundException;
import com.project.fmsbms.repositories.MobileServiceRepository;

@Service
public class MobileServiceServiceImpl implements MobileServiceService {
	private static final Logger loggers = LoggerFactory.getLogger(MobileServiceServiceImpl.class);

	@Autowired
	private MobileServiceRepository repo;
	
	@Override
	public MobileService addMobileService(MobileService mobileService) {
		MobileService ms = repo.save(mobileService);
		loggers.info("addMobileService");
		return ms;
	}

	@Override
	public MobileService getMobileService(Integer id) throws MobileServiceNotFoundException {
		Optional<MobileService> ms = repo.findById(id);
		if(ms.isPresent()) {
			loggers.info("getMobileService");
			return ms.get();
		}
		else throw new MobileServiceNotFoundException("Mobile Service Not Found");
				
	}

	@Override
	public MobileService updateMobileService(MobileService mobileService) throws MobileServiceNotFoundException {
		Optional<MobileService> mss = repo.findById(mobileService.getServiceId());
		if(mss.isPresent()) {
		MobileService ms = repo.save(mobileService);
		loggers.info("updateMobileService");
		return ms;
		}
		else throw new MobileServiceNotFoundException("Mobile Service Not Found");
	}

	@Override
	public MobileService getByFamilyMember(FamilyMember familyMember) throws MobileServiceNotFoundException{
		loggers.info("getByFamilyMemnber");
		return repo.findByFamilyMember(familyMember);
	}

	@Override
	public List<MobileService> getallServices(Integer familyId)
			throws FamilyNotFoundException, MobileServiceNotFoundException {
		List<MobileService> list= (List<MobileService>) repo.findAll();
		List<MobileService> result= new ArrayList<>();
		for(MobileService ms: list )
		{
			if(ms.getFamilyMember().getFamily().getFamilyId()==familyId)
			{
				result.add(ms);
			}
				
		}
	 if(!result.isEmpty())
	 {
		 return result;
		 
	 }
	 else throw new MobileServiceNotFoundException("Mobile Service Not Found");
	}

}
