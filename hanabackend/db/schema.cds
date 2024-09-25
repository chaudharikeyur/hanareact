namespace hanabackend.employee.management;
using {cuid} from '@sap/cds/common';

entity Employee {
    key ID       : Integer;
    FirstName    : String(100);
    LastName     : String(100);
    Email        : String(100);
    Phone        : String(15);
    Dep          : Composition of one Department on Dep.Employee = $self;
}

entity Department : cuid{
    Employee : Association to Employee;
    Name   : String(100);
    level  : String(100);
}
