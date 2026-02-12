from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Ward, Meeting
from .serializers import WardSerializer, MeetingSerializer

class WardViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Ward CRUD operations
    """
    queryset = Ward.objects.all()
    serializer_class = WardSerializer
    
    @action(detail=True, methods=['get'])
    def meetings(self, request, pk=None):
        """Get all meetings for a specific ward"""
        ward = self.get_object()
        meetings = ward.meetings.all()
        serializer = MeetingSerializer(meetings, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def update_details(self, request, pk=None):
        """Update ward details by ward admin"""
        ward = self.get_object()
        serializer = self.get_serializer(ward, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
