from datetime import datetime

def get_month_string(month_number):
    month = str(month_number)
    if month_number < 10:
        return '0' + month
    return month

def get_month_start_and_end(year_number, month_number):
    month = get_month_string(month_number)
    year = str(year_number)
    month_year = year + '-' + month + '-'
    month_start = month_year + '01'
    end_day = '28' if month_number == 2 else '30'
    month_end = month_year + end_day
    return month_start, month_end

def get_last_month_bounds(year, month):
    month_number = int(month)
    year_number = int(year)
    if month_number > 1:
        month_number = month_number - 1
    else:
        month_number = 12
        year_number = int(year)

    return get_month_start_and_end(year_number, month_number)

def get_year_and_month(date):
    year = date[:4]
    month = date[5:7]
    return year, month

def split_date(date_time):
    date = date_time[0:10]
    time = date_time[10:]
    return date, time

def get_iso_date_time():
    date_time = datetime.now()
    dtformat = '%Y-%m-%dT%H:%M:%SZ'
    return date_time.strftime(dtformat)

def get_current_month_number():
    date_time = get_iso_date_time()
    return int(date_time[5:7])

def get_last_month_date_time():
    date_time = get_iso_date_time()
    date, time = split_date(date_time)
    year, month = get_year_and_month(date)
    start_date, end_date = get_last_month_bounds(year, month)
    return start_date + time, end_date + time

