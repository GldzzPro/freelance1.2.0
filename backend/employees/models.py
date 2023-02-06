from django.db import models
from users.models import Profile 
from django.contrib.auth.models import User

from companies.models import Customers_Company, Supplier_Company
# Create your models here.


class Customer_Employees(models.Model):
    # company_id = models.ForeignKey(Customers_Company, null = True, on_delete=models.CASCADE)
    # user_id = models.ForeignKey(User, null=True, on_delete = models.CASCADE)

    company_id = models.CharField(max_length=20, null= True)
    user_id = models.CharField(max_length=20, null=True)


class Supplier_Employees(models.Model):
    company_id = models.ForeignKey(Supplier_Company, null = True, on_delete= models.CASCADE)
    user_id = models.ForeignKey(User, null= True , on_delete = models.CASCADE)