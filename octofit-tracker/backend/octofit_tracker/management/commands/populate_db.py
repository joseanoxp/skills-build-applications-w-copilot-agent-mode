# FILE: octofit-tracker/backend/octofit_tracker/management/commands/populate_db.py

from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from django.conf import settings
from pymongo import MongoClient
from datetime import timedelta
from bson import ObjectId

class Command(BaseCommand):
    help = 'Populate the database with test data for users, teams, activity, leaderboard, and workouts'

    def handle(self, *args, **kwargs):
        # Connect to MongoDB
        client = MongoClient(settings.DATABASES['default']['HOST'], settings.DATABASES['default']['PORT'])
        db = client[settings.DATABASES['default']['NAME']]

        # Drop existing collections
        self.stdout.write('Dropping existing collections...')
        db.users.drop()
        db.teams.drop()
        db.activity.drop()
        db.leaderboard.drop()
        db.workouts.drop()

        # Create users with OctoFit themed names
        self.stdout.write('Creating users...')
        users = [
            User(_id=ObjectId(), username='thundergod', email='thundergod@merington.edu', password='thundergodpassword'),
            User(_id=ObjectId(), username='metalgeek', email='metalgeek@merington.edu', password='metalgeekpassword'),
            User(_id=ObjectId(), username='zerocool', email='zerocool@merington.edu', password='zerocoolpassword'),
            User(_id=ObjectId(), username='crashoverride', email='crashoverride@merington.edu', password='crashoverridepassword'),
            User(_id=ObjectId(), username='sleeptoken', email='sleeptoken@merington.edu', password='sleeptokenpassword'),
        ]
        User.objects.bulk_create(users)
        self.stdout.write(f'Created {len(users)} users')

        # Create teams
        self.stdout.write('Creating teams...')
        blue_team = Team(_id=ObjectId(), name='Blue Team')
        blue_team.save()
        gold_team = Team(_id=ObjectId(), name='Gold Team')
        gold_team.save()
        
        # Add members to teams
        for i, user in enumerate(users):
            if i < 3:
                blue_team.members.add(user)
            else:
                gold_team.members.add(user)
        
        self.stdout.write('Created 2 teams with members')

        # Create activities
        self.stdout.write('Creating activities...')
        activities = [
            Activity(_id=ObjectId(), user=users[0], activity_type='Cycling', duration=timedelta(hours=1)),
            Activity(_id=ObjectId(), user=users[1], activity_type='Crossfit', duration=timedelta(hours=2)),
            Activity(_id=ObjectId(), user=users[2], activity_type='Running', duration=timedelta(hours=1, minutes=30)),
            Activity(_id=ObjectId(), user=users[3], activity_type='Strength', duration=timedelta(minutes=30)),
            Activity(_id=ObjectId(), user=users[4], activity_type='Swimming', duration=timedelta(hours=1, minutes=15)),
        ]
        Activity.objects.bulk_create(activities)
        self.stdout.write(f'Created {len(activities)} activities')

        # Create leaderboard entries
        self.stdout.write('Creating leaderboard entries...')
        leaderboard_entries = [
            Leaderboard(_id=ObjectId(), user=users[0], score=100),
            Leaderboard(_id=ObjectId(), user=users[1], score=90),
            Leaderboard(_id=ObjectId(), user=users[2], score=95),
            Leaderboard(_id=ObjectId(), user=users[3], score=85),
            Leaderboard(_id=ObjectId(), user=users[4], score=80),
        ]
        Leaderboard.objects.bulk_create(leaderboard_entries)
        self.stdout.write(f'Created {len(leaderboard_entries)} leaderboard entries')

        # Create workouts
        self.stdout.write('Creating workouts...')
        workouts = [
            Workout(_id=ObjectId(), name='Cycling Training', description='Training for a road cycling event', difficulty_level='Intermediate'),
            Workout(_id=ObjectId(), name='Crossfit WOD', description='Training for a crossfit competition', difficulty_level='Advanced'),
            Workout(_id=ObjectId(), name='Running Training', description='Training for a marathon', difficulty_level='Intermediate'),
            Workout(_id=ObjectId(), name='Strength Training', description='Training for strength building', difficulty_level='Beginner'),
            Workout(_id=ObjectId(), name='Swimming Training', description='Training for a swimming competition', difficulty_level='Intermediate'),
        ]
        Workout.objects.bulk_create(workouts)
        self.stdout.write(f'Created {len(workouts)} workouts')

        self.stdout.write(self.style.SUCCESS('Successfully populated the OctoFit database with test data!'))
        self.stdout.write('Database summary:')
        self.stdout.write(f'  - Users: {User.objects.count()}')
        self.stdout.write(f'  - Teams: {Team.objects.count()}')
        self.stdout.write(f'  - Activities: {Activity.objects.count()}')
        self.stdout.write(f'  - Leaderboard entries: {Leaderboard.objects.count()}')
        self.stdout.write(f'  - Workouts: {Workout.objects.count()}')
