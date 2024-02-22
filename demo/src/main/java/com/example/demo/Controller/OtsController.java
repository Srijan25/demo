package com.example.demo.Controller;

import java.text.SimpleDateFormat;
import com.example.demo.Entity.Ots;
import com.example.demo.Repository.OtsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Calendar;
import java.util.Date;

@RestController
@RequestMapping("/ots")
@CrossOrigin(origins = "*")
public class OtsController {
    @Autowired
    private OtsRepo otsRepo;

    @GetMapping("/all")
    public ResponseEntity<?> getAllOts(){
        return ResponseEntity.ok(this.otsRepo.findAll());
    }

    @PostMapping("/add")
    public ResponseEntity<?> addOts(@RequestBody Ots ots){
        Ots ots1 = new Ots();
        System.out.println(ots);
        ots1.setAccounts(ots.getAccounts());
        ots1.setAmount(ots.getAmount());
        ots1.setCustomerName(ots.getCustomerName());
        Date yourDate = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
        String formattedDate = sdf.format(yourDate);
        if(ots.getSanctionDate().after(yourDate)){
            ots1.setSanctionDate(ots.getSanctionDate());

        }else{
            return ResponseEntity.badRequest().body("Sanction date is before today's date");
        }

        Date expiryDate = addDays(ots.getSanctionDate(), 90);
        if(ots.getExpiryDate().before(expiryDate)){
            ots1.setExpiryDate(ots.getExpiryDate());
        }else{
            return ResponseEntity.badRequest().body("Expiry date is after 90 days of sanction date");
        }
        return ResponseEntity.ok(this.otsRepo.save(ots1));




    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteOts(@PathVariable int id){
        this.otsRepo.deleteById(id);
        return ResponseEntity.ok("Deleted");
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateOts(@PathVariable int id, @RequestBody Ots ots){
        Ots ots1 = this.otsRepo.getById(id);
ots1.setAccounts(ots.getAccounts());
ots1.setAmount(ots.getAmount());
ots1.setCustomerName(ots.getCustomerName());
        Date yourDate = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
        String formattedDate = sdf.format(yourDate);
        if(ots.getSanctionDate().after(yourDate)){
            ots1.setSanctionDate(ots.getSanctionDate());

        }else{
            return ResponseEntity.badRequest().body("Sanction date is before today's date");
        }

        Date expiryDate = addDays(ots.getSanctionDate(), 90);
        if(ots.getExpiryDate().before(expiryDate)){
            ots1.setExpiryDate(ots.getExpiryDate());
        }else{
            return ResponseEntity.badRequest().body("Expiry date is after 90 days of sanction date");
        }

        return ResponseEntity.ok(this.otsRepo.save(ots1));
    }

    private Date addDays(Date date, int days) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_YEAR, days);
        return calendar.getTime();
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<?> getOts(@PathVariable int id){
        return ResponseEntity.ok(this.otsRepo.findById(id));
    }


}
