from django.contrib import admin
from django.forms import ModelForm
from django.forms.widgets import DateInput
from .models import Ward, Meeting

class MeetingForm(ModelForm):
    """Custom form for Meeting with improved date widget"""
    class Meta:
        model = Meeting
        fields = ['ward', 'meeting_date', 'meeting_time', 'venue', 'agenda', 'notes', 'is_cancelled']
        widgets = {
            'meeting_date': DateInput(attrs={
                'type': 'date',
                'class': 'vDateField',
                'style': 'width: 100%; padding: 8px; font-size: 14px;'
            }),
            'meeting_time': admin.widgets.AdminTimeWidget(),
            'venue': admin.widgets.AdminTextInputWidget(),
            'agenda': admin.widgets.AdminTextareaWidget(),
            'notes': admin.widgets.AdminTextareaWidget(),
        }

@admin.register(Ward)
class WardAdmin(admin.ModelAdmin):
    list_display = ['ward_name', 'meeting_day', 'meeting_time', 'venue', 'ward_admin']
    list_filter = ['meeting_day', 'created_at']
    search_fields = ['ward_name', 'venue']
    fieldsets = (
        ('Basic Information', {
            'fields': ('id', 'ward_name', 'venue')
        }),
        ('Meeting Schedule', {
            'fields': ('meeting_day', 'meeting_time', 'frequency_weeks', 'start_date')
        }),
        ('Administration', {
            'fields': ('ward_admin',)
        }),
    )

@admin.register(Meeting)
class MeetingAdmin(admin.ModelAdmin):
    form = MeetingForm
    list_display = ['ward', 'meeting_date', 'meeting_time', 'is_cancelled']
    list_filter = ['ward', 'meeting_date', 'is_cancelled']
    search_fields = ['ward__ward_name', 'venue']
    fieldsets = (
        ('Meeting Details', {
            'fields': ('ward', 'meeting_date', 'meeting_time', 'venue'),
            'description': 'Enter the meeting details. Click on the date field to open the calendar picker.'
        }),
        ('Content', {
            'fields': ('agenda', 'notes'),
            'classes': ('collapse',)
        }),
        ('Status', {
            'fields': ('is_cancelled',)
        }),
    )
