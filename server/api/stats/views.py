from django.shortcuts import render
from django.http import HttpResponse
from django.core.serializers import serialize

# Create your views here.
from django.core.serializers import serialize

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status

from .models import Stats
from .serializers import StatsSerializers
from rest_framework.decorators import api_view
from django.contrib.auth.models import User

# Create your views here.
@api_view(['GET'])
def index(request):
  if request.method == 'GET':
    stats = Stats.objects.all()
    stats_serializer = StatsSerializers(stats, many=True)
    return JsonResponse(stats_serializer.data, safe=False)

@api_view(['GET', 'POST', 'PATCH'])
def individual_stats(request, id):
  stats = Stats.objects.get(pk=id)
  if stats.is_valid():
    if request.method == 'GET':
      return False
    elif request.method == 'POST':
      return False
    elif request.method == 'PATCH':
      return False
  else:
    return JsonResponse("No", status=status.HTTP_400_BAD_REQUEST)