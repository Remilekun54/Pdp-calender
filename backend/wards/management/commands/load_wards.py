from django.core.management.base import BaseCommand
from wards.models import Ward
from datetime import date

class Command(BaseCommand):
    help = 'Load initial ward data'

    def handle(self, *args, **kwargs):
        wards_data = [
            {
                "id": "ward-1",
                "ward_name": "Ward 1 (Central)",
                "meeting_day": "Wednesday",
                "meeting_time": "5:00 PM",
                "venue": "Akinyele Primary School Hall",
                "frequency_weeks": 2,
                "start_date": "2024-01-03"
            },
            {
                "id": "ward-2",
                "ward_name": "Ward 2 (North)",
                "meeting_day": "Saturday",
                "meeting_time": "10:00 AM",
                "venue": "North Community Outreach Center",
                "frequency_weeks": 2,
                "start_date": "2024-01-06"
            },
            {
                "id": "ward-3",
                "ward_name": "Ward 3 (South)",
                "meeting_day": "Monday",
                "meeting_time": "4:30 PM",
                "venue": "Unity Square Pavilion",
                "frequency_weeks": 2,
                "start_date": "2024-01-01"
            },
            {
                "id": "ward-4",
                "ward_name": "Ward 4 (East)",
                "meeting_day": "Thursday",
                "meeting_time": "6:00 PM",
                "venue": "St. Jude's Community Hall",
                "frequency_weeks": 2,
                "start_date": "2024-01-04"
            },
            {
                "id": "ward-5",
                "ward_name": "Ward 5 (West)",
                "meeting_day": "Sunday",
                "meeting_time": "2:00 PM",
                "venue": "Elders' Resource Center",
                "frequency_weeks": 2,
                "start_date": "2024-01-07"
            },
            {
                "id": "ward-6",
                "ward_name": "Ward 6 (Akinyele)",
                "meeting_day": "Wednesday",
                "meeting_time": "2:00 PM",
                "venue": "Ojo Youth Development Hub",
                "frequency_weeks": 2,
                "start_date": "2026-02-04"
            },
            {
                "id": "ward-7",
                "ward_name": "Ward 7 (Railway Line)",
                "meeting_day": "Wednesday",
                "meeting_time": "4:00 PM",
                "venue": "Station Master's Hall",
                "frequency_weeks": 2,
                "start_date": "2024-01-10"
            },
            {
                "id": "ward-8",
                "ward_name": "Ward 8 (Market Square)",
                "meeting_day": "Saturday",
                "meeting_time": "9:00 AM",
                "venue": "Market Association Building",
                "frequency_weeks": 2,
                "start_date": "2024-01-13"
            },
            {
                "id": "ward-9",
                "ward_name": "Ward 9 (Industrial)",
                "meeting_day": "Monday",
                "meeting_time": "6:00 PM",
                "venue": "Akinyele Factory Workers' Club",
                "frequency_weeks": 2,
                "start_date": "2024-01-08"
            },
            {
                "id": "ward-10",
                "ward_name": "Ward 10 (Hilltop)",
                "meeting_day": "Thursday",
                "meeting_time": "5:00 PM",
                "venue": "Highland View Community Center",
                "frequency_weeks": 2,
                "start_date": "2024-01-11"
            },
            {
                "id": "ward-11",
                "ward_name": "Ward 11 (Riverside)",
                "meeting_day": "Sunday",
                "meeting_time": "10:00 AM",
                "venue": "Riverside Garden Pavilion",
                "frequency_weeks": 2,
                "start_date": "2024-01-14"
            },
            {
                "id": "ward-12",
                "ward_name": "Ward 12 (New Layout)",
                "meeting_day": "Tuesday",
                "meeting_time": "4:00 PM",
                "venue": "Estate Management Office Hall",
                "frequency_weeks": 2,
                "start_date": "2024-01-09"
            }
        ]
        
        for ward_data in wards_data:
            start_date = date.fromisoformat(ward_data.pop('start_date'))
            ward, created = Ward.objects.get_or_create(
                id=ward_data['id'],
                defaults={**ward_data, 'start_date': start_date}
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'Created ward: {ward.ward_name}'))
            else:
                self.stdout.write(f'Ward already exists: {ward.ward_name}')
        
        self.stdout.write(self.style.SUCCESS('Ward data loaded successfully'))
