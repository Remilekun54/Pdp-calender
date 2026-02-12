# Generated migration file
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='Ward',
            fields=[
                ('id', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('ward_name', models.CharField(max_length=255, unique=True)),
                ('meeting_day', models.CharField(choices=[('Monday', 'Monday'), ('Tuesday', 'Tuesday'), ('Wednesday', 'Wednesday'), ('Thursday', 'Thursday'), ('Friday', 'Friday'), ('Saturday', 'Saturday'), ('Sunday', 'Sunday')], max_length=10)),
                ('meeting_time', models.CharField(max_length=20)),
                ('venue', models.CharField(max_length=255)),
                ('frequency_weeks', models.IntegerField(default=2)),
                ('start_date', models.DateField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('ward_admin', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='ward', to='auth.user')),
            ],
            options={
                'ordering': ['id'],
            },
        ),
        migrations.CreateModel(
            name='Meeting',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('meeting_date', models.DateField()),
                ('meeting_time', models.CharField(max_length=20)),
                ('venue', models.CharField(max_length=255)),
                ('agenda', models.TextField(blank=True, null=True)),
                ('notes', models.TextField(blank=True, null=True)),
                ('is_cancelled', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('ward', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='meetings', to='wards.ward')),
            ],
            options={
                'ordering': ['-meeting_date'],
                'unique_together': {('ward', 'meeting_date')},
            },
        ),
    ]
