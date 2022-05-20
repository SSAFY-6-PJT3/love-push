package com.cupid.joalarm.contact.service;

import com.cupid.joalarm.contact.dto.ContactDto;
import com.cupid.joalarm.contact.entity.Contact;
import com.cupid.joalarm.contact.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class ContactService {

    private final ContactRepository contactRepository;

    @Autowired
    public ContactService(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    @Transactional
    public List<ContactDto> getContact() {

        List<ContactDto> result = new ArrayList<>();
        List<Contact> contacts = contactRepository.findAll();

        for (Contact contact : contacts) {
            ContactDto contactDto = new ContactDto();

            contactDto.setType(contact.getType());
            contactDto.setContent(contact.getContent());
            result.add(contactDto);
        }

        return result;
    }

    @Transactional
    public ContactDto saveContact(ContactDto contactDto) {
        Contact contact = Contact.builder()
                .type(contactDto.getType())
                .content(contactDto.getContent())
                .build();

        contactRepository.save(contact);

        return contactDto;
    }
}
