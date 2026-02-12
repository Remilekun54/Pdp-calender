from django.db import models
from django.contrib.auth.models import User

class Ward(models.Model):
    """
    Model representing a ward in Akinyele Local Government Area
    """
    DAYS_CHOICES = [
        ('Monday', 'Monday'),
        ('Tuesday', 'Tuesday'),
        ('Wednesday', 'Wednesday'),
        ('Thursday', 'Thursday'),
        ('Friday', 'Friday'),
        ('Saturday', 'Saturday'),
        ('Sunday', 'Sunday'),
    ]
    
    id = models.CharField(max_length=50, primary_key=True)  # ward-1, ward-2, etc.
    ward_name = models.CharField(max_length=255, unique=True)
    meeting_day = models.CharField(max_length=10, choices=DAYS_CHOICES)
    meeting_time = models.CharField(max_length=20)  # e.g., "5:00 PM"
    venue = models.CharField(max_length=255)
    frequency_weeks = models.IntegerField(default=2)  # Every 2 weeks
    start_date = models.DateField()  # ISO format: YYYY-MM-DD
    
    # Admin user for this ward
    ward_admin = models.OneToOneField(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='ward')
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['id']
    
    def __str__(self):
        return self.ward_name


class Meeting(models.Model):
    """
    Model representing a specific meeting instance
    """
    ward = models.ForeignKey(Ward, on_delete=models.CASCADE, related_name='meetings')
    meeting_date = models.DateField()
    meeting_time = models.CharField(max_length=20)
    venue = models.CharField(max_length=255)
    agenda = models.TextField(blank=True, null=True)
    notes = models.TextField(blank=True, null=True)
    is_cancelled = models.BooleanField(default=False)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-meeting_date']
        unique_together = ['ward', 'meeting_date']
    
    def __str__(self):
        return f"{self.ward.ward_name} - {self.meeting_date}"
