declare lower;

input length = 5;               # MA period
input strongZone = 5;           # threshold for extreme cloud
input mvaThreshold = 3;         # MA strong move threshold

# ----------------------
# MAG7 Tick Calculation
# ----------------------
def t1 = if close("AAPL") > close("AAPL")[1] then 1 else if close("AAPL") < close("AAPL")[1] then -1 else 0;
def t2 = if close("MSFT") > close("MSFT")[1] then 1 else if close("MSFT") < close("MSFT")[1] then -1 else 0;
def t3 = if close("AMZN") > close("AMZN")[1] then 1 else if close("AMZN") < close("AMZN")[1] then -1 else 0;
def t4 = if close("META") > close("META")[1] then 1 else if close("META") < close("META")[1] then -1 else 0;
def t5 = if close("NVDA") > close("NVDA")[1] then 1 else if close("NVDA") < close("NVDA")[1] then -1 else 0;
def t6 = if close("GOOGL") > close("GOOGL")[1] then 1 else if close("GOOGL") < close("GOOGL")[1] then -1 else 0;
def t7 = if close("TSLA") > close("TSLA")[1] then 1 else if close("TSLA") < close("TSLA")[1] then -1 else 0;

def magTick = t1 + t2 + t3 + t4 + t5 + t6 + t7;

# ----------------------
# Histogram with brightest extremes
# ----------------------
plot MAG7Tick = magTick;
MAG7Tick.SetPaintingStrategy(PaintingStrategy.HISTOGRAM);
MAG7Tick.SetLineWeight(4);
MAG7Tick.AssignValueColor(
    if magTick == 7 then CreateColor(0,255,0)
    else if magTick >= 5 then CreateColor(0,200,0)
    else if magTick > 0 then CreateColor(144,238,144)
    else if magTick == 0 then CreateColor(128,128,128)
    else if magTick <= -7 then CreateColor(255,0,0)
    else if magTick <= -5 then CreateColor(200,0,0)
    else CreateColor(255,182,193)
);

# ----------------------
# Moving Average
# ----------------------
plot MAG7MA = Average(magTick, length);
MAG7MA.SetDefaultColor(CreateColor(255,215,0));
MAG7MA.SetLineWeight(2);

# ----------------------
# Reference Line (0 only)
# ----------------------
plot zeroLine = 0;
zeroLine.SetDefaultColor(Color.GRAY);
zeroLine.SetStyle(Curve.SHORT_DASH);

# ----------------------
# Visual Markers for Extreme Readings (closed bars only)
# ----------------------
# Dots removed - ThinkScript POINTS strategy doesn't center properly
# Rely on color coding and clouds to show extreme readings

# ----------------------
# Clouds for extremes
# ----------------------
AddCloud(
    if magTick >= strongZone or MAG7MA >= mvaThreshold then magTick else Double.NaN,
    strongZone,
    CreateColor(0,128,0),
    CreateColor(0,128,0)
);

AddCloud(
    if magTick <= -strongZone or MAG7MA <= -mvaThreshold then magTick else Double.NaN,
    -strongZone,
    CreateColor(128,0,0),
    CreateColor(128,0,0)
);

# ----------------------
# Label
# ----------------------
AddLabel(yes, "MAG7 Tick: " + magTick,
         if magTick>0 then CreateColor(0,255,0)
         else if magTick<0 then CreateColor(255,0,0)
         else Color.GRAY);
