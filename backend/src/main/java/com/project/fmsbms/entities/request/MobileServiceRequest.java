package com.project.fmsbms.entities.request;

import com.project.fmsbms.entities.Plans;

import jakarta.persistence.EnumType;
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
public class MobileServiceRequest {
	
	private String username;
	

	@Enumerated
	private Plans planType;
}