# Generated by Django 4.2.4 on 2023-12-31 11:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('besafe', '0003_alter_contentshero_subtitle'),
    ]

    operations = [
        migrations.AlterField(
            model_name='contentshero',
            name='button_url',
            field=models.CharField(blank=True, max_length=256, null=True, verbose_name='자세히 보기 URL'),
        ),
    ]