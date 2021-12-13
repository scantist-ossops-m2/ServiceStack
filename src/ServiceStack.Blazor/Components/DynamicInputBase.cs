using System.Collections.Generic;
using Microsoft.AspNetCore.Components;

namespace ServiceStack.Blazor.Components;

public class DynamicInputBase : TextInputBase
{
    [Parameter, EditorRequired]
    public Dictionary<string, object> Model { get; set; } = new();

    protected string Value
    {
        get => Model.TryGetValue(Input!.Id, out var value) ? value?.ToString() ?? "" : "";
        set => Model[Input!.Id] = value ?? "";
    }

    [Parameter, EditorRequired]
    public InputInfo? Input { get; set; }

    [Parameter]
    public override string? Id
    {
        get => Input?.Id;
        set => Input!.Id = value;
    }

    protected string UseId => Input!.Id!;

    protected string UseHelp => Input!.Type != "checkbox" ? TextUtils.Humanize(Input!.Id) : "";
    protected List<KeyValuePair<string, string>> KvpValues() => TextUtils.ToKeyValuePairs(Model);

    protected Dictionary<string, object>? AllAttributes
    {
        get
        {
            var input = Input!;
            var to = new Dictionary<string, object>()
            {
                ["id"] = input.Id,
                ["name"] = input.Name,
                ["type"] = input.Type,
                ["placeholder"] = input.Placeholder,
                ["pattern"] = input.Pattern,
                ["readonly"] = input.ReadOnly ?? false,
                ["required"] = input.Required ?? false,
                ["min"] = input.Min,
                ["max"] = input.Max,
                ["step"] = input.Step ?? 0,
                ["minlength"] = input.MinLength ?? 0,
                ["maxlength"] = input.MaxLength ?? 0,
            };
            if (input.Meta != null)
            {
                foreach (var entry in input.Meta)
                {
                    to[entry.Key] = entry.Value;
                }
            }
            foreach (var key in to.Keys.ToArray())
            {
                var val = to[key];
                if ((val is null)
                    || (val is bool b && !b)
                    || (val is int i && i == 0)
                    || (val is string s && (s.StartsWith("on") || SanitizeAttribute(s))))
                {
                    to.Remove(key);
                }
            }
            if (AdditionalAttributes != null)
            {
                foreach (var entry in AdditionalAttributes)
                {
                    to[entry.Key] = entry.Value;
                }
            }

            return to;
        }
    }
}
