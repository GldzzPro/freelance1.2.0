from django.db import models
from users.models import Profile 
from companies.models import Customers_Company, Supplier_Company
# Create your models here.


class Customer_Employees(models.Model):
    company_id = models.ForeignKey(Customers_Company, null = True, on_delete=models.CASCADE)
    profile_id = models.ForeignKey(Profile, null=True, on_delete = models.CASCADE)




class Supplier_Employees(models.Model):
    company_id = models.ForeignKey(Supplier_Company, null = True, on_delete= models.CASCADE)
    profile_id = models.ForeignKey(Profile, null= True , on_delete = models.CASCADE)