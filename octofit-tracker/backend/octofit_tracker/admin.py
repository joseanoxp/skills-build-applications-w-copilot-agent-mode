from django.contrib import admin
from .models import User, Team, Activity, Leaderboard, Workout

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email')
    search_fields = ('username', 'email')
    list_filter = ('email',)

@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ('user', 'activity_type', 'duration', 'date_created')
    list_filter = ('activity_type', 'date_created')
    search_fields = ('user__username', 'activity_type')
    readonly_fields = ('date_created',)

@admin.register(Leaderboard)
class LeaderboardAdmin(admin.ModelAdmin):
    list_display = ('user', 'score', 'date_updated')
    list_filter = ('date_updated',)
    search_fields = ('user__username',)
    readonly_fields = ('date_updated',)
    ordering = ('-score',)

@admin.register(Workout)
class WorkoutAdmin(admin.ModelAdmin):
    list_display = ('name', 'difficulty_level', 'date_created')
    list_filter = ('difficulty_level', 'date_created')
    search_fields = ('name', 'description')
    readonly_fields = ('date_created',)
