from django.shortcuts import render
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializers import CustomerEmployeesSerializer, SupplierEmployeesSerializer
# Create your views here.






@api_view(['GET'])
def getRoutes(request):
    routes = [
        'customer/register',
        'supplier/register',
        'customer/list',
        'supplier/list',
        
    ]

    return Response(routes)





@api_view(['POST'])
def CustomerEmployeeRegister(request):
    serializer = CustomersCompanySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def SupplierEmployeeRegister(request):
    serializer = SupplierCompanySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(vserializer.data)    


@api_view(['GET'])
def CustomerEmployeeList(request):
    employee = Customers_Company.objects.all()
    serializer = CustomersCompanySerializer(company, many=True)
    return Response(serializer.data)



@api_view(['GET'])
def SupplierEmployeeList(request):
    employee = Supplier_Company.objects.all()
    serializer = SupplierCompanySerializer(company, many=True)
    return Response(serializer.data)    