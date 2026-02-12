from rest_framework import serializers
from .models import Ward, Meeting
from datetime import datetime

class MeetingSerializer(serializers.ModelSerializer):
    meeting_date = serializers.DateField(format='%Y-%m-%d')
    
    class Meta:
        model = Meeting
        fields = ['id', 'meeting_date', 'meeting_time', 'venue', 'agenda', 'notes', 'is_cancelled']

class WardSerializer(serializers.ModelSerializer):
    meetings = MeetingSerializer(many=True, read_only=True)
    start_date = serializers.DateField(format='%Y-%m-%d')
    
    class Meta:
        model = Ward
        fields = [
            'id', 'ward_name', 'meeting_day', 'meeting_time', 
            'venue', 'frequency_weeks', 'start_date', 'ward_admin',
            'created_at', 'updated_at', 'meetings'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
