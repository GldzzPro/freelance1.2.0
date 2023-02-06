from django.shortcuts import render
from django.contrib.auth.models import User
from django.http import JsonResponse
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializers import CustomerEmployeesSerializer, SupplierEmployeesSerializer
from .models import Customer_Employees
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



# @api_view(['POST'])
# def EmployeeRegister(register):
#     try:
#         serialzier = 

@api_view(['POST'])
def CustomerEmployeeRegister(request):
    serializer = CustomerEmployeesSerializer(data=request.data)
    print(request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def SupplierEmployeeRegister(request):
    serializer = SupplierEmployeesSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)    


@api_view(['GET'])
def CustomerEmployeeList(request):
    employee = Customer_Employees.objects.all()
    serializer = CustomerEmployeesSerializer(employee, many=True)
    return Response(serializer.data)



@api_view(['GET'])
def SupplierEmployeeList(request):
    employee = Supplier_Company.objects.all()
    serializer = SupplierEmployeesSerializer(company, many=True)
    return Response(serializer.data)    