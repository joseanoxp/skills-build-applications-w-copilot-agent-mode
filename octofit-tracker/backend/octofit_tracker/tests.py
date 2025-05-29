from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from .models import User, Team, Activity, Leaderboard, Workout
from bson import ObjectId
from datetime import timedelta

class UserModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(
            username='testuser',
            email='testuser@octofit.edu',
            password='testpassword'
        )

    def test_user_creation(self):
        self.assertEqual(self.user.username, 'testuser')
        self.assertEqual(self.user.email, 'testuser@octofit.edu')
        self.assertEqual(str(self.user), 'testuser')

class TeamModelTest(TestCase):
    def setUp(self):
        self.team = Team.objects.create(name='Test Team')

    def test_team_creation(self):
        self.assertEqual(self.team.name, 'Test Team')
        self.assertEqual(str(self.team), 'Test Team')

class ActivityModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(
            username='testuser',
            email='testuser@octofit.edu',
            password='testpassword'
        )
        self.activity = Activity.objects.create(
            user=self.user,
            activity_type='Running',
            duration=timedelta(hours=1)
        )

    def test_activity_creation(self):
        self.assertEqual(self.activity.user, self.user)
        self.assertEqual(self.activity.activity_type, 'Running')
        self.assertEqual(self.activity.duration, timedelta(hours=1))
        self.assertEqual(str(self.activity), 'testuser - Running')

class LeaderboardModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(
            username='testuser',
            email='testuser@octofit.edu',
            password='testpassword'
        )
        self.leaderboard = Leaderboard.objects.create(
            user=self.user,
            score=100
        )

    def test_leaderboard_creation(self):
        self.assertEqual(self.leaderboard.user, self.user)
        self.assertEqual(self.leaderboard.score, 100)
        self.assertEqual(str(self.leaderboard), 'testuser - 100')

class WorkoutModelTest(TestCase):
    def setUp(self):
        self.workout = Workout.objects.create(
            name='Test Workout',
            description='A test workout description',
            difficulty_level='Intermediate'
        )

    def test_workout_creation(self):
        self.assertEqual(self.workout.name, 'Test Workout')
        self.assertEqual(self.workout.description, 'A test workout description')
        self.assertEqual(self.workout.difficulty_level, 'Intermediate')
        self.assertEqual(str(self.workout), 'Test Workout')

class APITestCases(APITestCase):
    def setUp(self):
        self.user = User.objects.create(
            username='apiuser',
            email='apiuser@octofit.edu',
            password='apipassword'
        )

    def test_api_root(self):
        url = reverse('api-root')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('users', response.data)
        self.assertIn('teams', response.data)
        self.assertIn('activities', response.data)
        self.assertIn('leaderboard', response.data)
        self.assertIn('workouts', response.data)

    def test_user_list_api(self):
        url = '/api/users/'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_team_list_api(self):
        url = '/api/teams/'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_activity_list_api(self):
        url = '/api/activities/'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_leaderboard_list_api(self):
        url = '/api/leaderboard/'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_workout_list_api(self):
        url = '/api/workouts/'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
