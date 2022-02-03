from django.forms import JSONField
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView


# Create your views here.
#@api_view()
#def GraphView(request):
   # return Response({"message": "Hello, world!"})


class GraphView(APIView):
#mixins.ListModelMixin,
                     #viewsets.GenericViewSet)
 #   def get_queryset(any):
 #       return None
 ##   def get_serializer_class(any):
       # return None
    def get(self, request, format=None):
        return Response(["dnwakldn"])
        
