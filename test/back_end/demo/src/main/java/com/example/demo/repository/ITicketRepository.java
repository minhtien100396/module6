package com.example.demo.repository;

import com.example.demo.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ITicketRepository extends JpaRepository<Ticket, Integer> {
    @Query(value = "select * from `ticket` where local_from like %:localFrom% and local_to like %:localTo% and garage_id like %:garageId% and date(day_from) between date(:dayFromFrom) and date(:dayFromTo) and status = 1", nativeQuery = true)
    List<Ticket> search(@Param("localFrom") String localFrom,
                        @Param("localTo") String localTo,
                        @Param("dayFromFrom") String dayFromFrom,
                        @Param("dayFromTo") String dayFromTo,
                        @Param("garageId") String garageId);

    @Query(value = "select * from `ticket` where local_from like %:localFrom% and local_to like %:localTo% and garage_id like %:garageId% and status = 1", nativeQuery = true)
    List<Ticket> searchNotDay(@Param("localFrom") String localFrom,
                              @Param("localTo") String localTo,
                              @Param("garageId") String garageId);

    @Query(value = "select * from `ticket` where local_from like %:localFrom% and local_to like %:localTo% and garage_id like %:garageId% and date(day_from) <= date(:dayFromTo) and status = 1", nativeQuery = true)
    List<Ticket> searchNotDayFrom(@Param("localFrom") String localFrom,
                                  @Param("localTo") String localTo,
                                  @Param("dayFromTo") String dayFromTo,
                                  @Param("garageId") String garageId);

    @Query(value = "select * from `ticket` where local_from like %:localFrom% and local_to like %:localTo% and garage_id like %:garageId% and date(day_from) >= date(:dayFromFrom) and status = 1", nativeQuery = true)
    List<Ticket> searchNotDayFromTo(@Param("localFrom") String localFrom,
                                    @Param("localTo") String localTo,
                                    @Param("dayFromFrom") String dayFromFrom,
                                    @Param("garageId") String garageId);

    @Query(value = "select * from `ticket` where status = 1", nativeQuery = true)
    List<Ticket> findAllList();

    @Query(value = "select * from `ticket` where id=:idTicket and status = 1", nativeQuery = true)
    Optional<Ticket> findByIdTicket(@Param("idTicket") int idTicket);
}
