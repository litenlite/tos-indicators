declare lower;

input MA_length = 5;           # Moving Average period
input strong1 = 600;            # medium strong zone
input strong2 = 1000;           # extreme zone

# ----------------------
# TICK Histogram
# ----------------------
plot TICKBar = close("$TICK");
TICKBar.SetPaintingStrategy(PaintingStrategy.HISTOGRAM);
TICKBar.SetLineWeight(3);
TICKBar.AssignValueColor(
    if TICKBar >= strong2 then CreateColor(0,255,0)
    else if TICKBar >= strong1 then CreateColor(0,200,0)
    else if TICKBar > 0 then CreateColor(144,238,144)
    else if TICKBar <= -strong2 then CreateColor(255,0,0)
    else if TICKBar <= -strong1 then CreateColor(255,50,50)
    else CreateColor(255,182,193)
);

# ----------------------
# Moving Average
# ----------------------
plot TICK_MA = Average(close("$TICK"), MA_length);
TICK_MA.SetDefaultColor(CreateColor(255,215,0));  # gold
TICK_MA.SetLineWeight(2);

# ----------------------
# Reference Lines
# ----------------------
plot zeroLine = 0;
zeroLine.SetDefaultColor(Color.GRAY);
zeroLine.SetLineWeight(1);
zeroLine.SetStyle(Curve.SHORT_DASH);

plot plus600  = strong1;
plot plus1000 = strong2;
plot minus600  = -strong1;
plot minus1000 = -strong2;

plus600.SetDefaultColor(CreateColor(0,150,0));
plus1000.SetDefaultColor(CreateColor(0,100,0));
minus600.SetDefaultColor(CreateColor(150,0,0));
minus1000.SetDefaultColor(CreateColor(100,0,0));

plus600.SetStyle(Curve.SHORT_DASH);
plus1000.SetStyle(Curve.SHORT_DASH);
minus600.SetStyle(Curve.SHORT_DASH);
minus1000.SetStyle(Curve.SHORT_DASH);

# ----------------------
# Label
# ----------------------
AddLabel(yes, "$TICK: " + AsText(TICKBar),
         if TICKBar>0 then CreateColor(0,255,0)
         else if TICKBar<0 then CreateColor(255,0,0)
         else Color.GRAY);
