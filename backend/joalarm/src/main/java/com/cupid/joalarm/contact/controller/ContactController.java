package com.cupid.joalarm.contact.controller;

import com.cupid.joalarm.contact.dto.ContactDto;
import com.cupid.joalarm.contact.service.ContactService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api("contact 관련 기능")
@RestController
@RequestMapping("contacts")
public class ContactController {

    private ContactService contactService;

    @Autowired
    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @GetMapping
    @ApiOperation(value = "건의 내용 조회", notes = "건의 내용 조회, 조회 완료하면 200, 서버 에러시 500")
    public ResponseEntity<List<ContactDto>> getContact() {
        return ResponseEntity.ok(contactService.getContact());
    }

    @PostMapping
    @ApiOperation(value = "건의 내용 저장", notes = "건의 내용 저장, 저장 성공하면 201, 형식 맞지 않을 경우 400, 서버 에러시 500 상태코드를 보낸다.")
    public ResponseEntity<ContactDto> saveContact(@RequestBody ContactDto contactDto){
        return ResponseEntity.ok(contactService.saveContact(contactDto));
    }
}
