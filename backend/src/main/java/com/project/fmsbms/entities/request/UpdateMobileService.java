package com.project.fmsbms.entities.request;

import com.project.fmsbms.entities.Plans;

import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class UpdateMobileService {
	
private Integer serviceId;
	

	@Enumerated
	private Plans planType;

}
