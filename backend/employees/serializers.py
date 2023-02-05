from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import Supplier_Company, Customers_Company



class CustomerEmployeesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customers_Company
        fields = '__all__'


class SupplierEmployeesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier_Company
        fields = '__all__'
