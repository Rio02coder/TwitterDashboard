from django.db import models


class Prediction(models.Model):
    prediction = models.FloatField(verbose_name="Flu prediction", blank=False)
    requires_re_computation = models.BooleanField(verbose_name='Re computation', default=False, blank=False)
