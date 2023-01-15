SELECT * FROM test_module5.ticket;
use test_module5;
select * from ticket where local_from like '%a%' and local_to like '%u%' and garage_id like 3 and day_from <= '2023-12-21';

select * from ticket t 
join garage g on t.garage_id = g.id;