from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework import permissions
from .serializers import ProjectSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework import generics
from rest_framework.response import Response
from .models import Project
# Create your views here.




@api_view(['GET'])
def getRoutes(request):
    routes = {
        'List':'/project-list/',
        'Detail view':'/project-detail/<str:pk>/',
        'Create':'/project-create/',
        'Createed-project':'/project-created/',
        'Update':'/project-update/<str:pk>/',
        'Delete':'/project-delete/<str:pk>',
    }
    

    return Response(routes)

@api_view(['GET'])
def ProjectList(request):
    project = Project.objects.filter(status='1')
    serializer = ProjectSerializer(project, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def ProjectCreated(request):
    project = Project.objects.filter(project_owner=request.user)
    serializer = ProjectSerializer(project, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def ProjectCreate(request):
    serializer = ProjectSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(project_owner=request.user)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def ProjectUpdate(request, pk):
    project = Project.objects.get(id=int(pk))
    serializer = ProjectSerializer(instance=project,data=request.data)
    if serializer.is_valid():
        serializer.save(project_owner=request.user)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def ProjectDelete(request, pk):
    project = Project.objects.get(id=pk)
    project.delete()
    return Response('Item succesfully deleted!')




#this is nothing
class ProjectView(generics.CreateAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = ProjectSerializer

    def get_queryset(self):
        return self.request.user.project.all()

    def perform_create(self, serializer):
        serializer.save(project_owner=self.request.user)